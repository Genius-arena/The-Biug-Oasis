import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin.image);
  // const hasImagePath = newCabin.image?.startsWith?.(supabase); // Would still work like the one below
  const hasImagePath = typeof newCabin.image === "string";
  
  console.log(hasImagePath);

  // const hasImagePathi = newCabin?.image?.startsWith?.(supabaseUrl);
  // console.log(newCabin?.image?.startsWith?.(supabaseUrl));

  console.log(hasImagePath);

  console.log(newCabin);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit a Cabin
  let query = supabase.from("cabins");

  // A) CREATE Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload an image
   if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploadng the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}

// export async function updateCabin(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .update({ other_column: "otherValue" })
//     .eq("some_column", "someValue")
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Cabins could not be updated");
//   }

//   return data;
// }
