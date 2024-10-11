import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// const FormRow2 = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  // console.log(getValues().regularPrice);
  // console.log(getValues().discount);

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  // const supabaseUrl = "https://yifaqbebanazzmjtewvo.supabase.co";
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(data.image);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // console.log(image);
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : ""}
    >
      {/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "The name field is required" })}
        />
      </FormRow2> */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "The name field is required" })}
        />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "The max capacity field is required",
            min: {
              value: 1,
              message: "The max Capacity should be at least 1",
            },
          })}
        />
      </FormRow2> */}
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "The max capacity field is required",
            min: {
              value: 1,
              message: "The max Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "The regular price field is required",
            min: {
              value: 1,
              message: "The Regular Price should be at least 1",
            },
          })}
        />
      </FormRow2> */}
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          id="regularPrice"
          disabled={isWorking}
          defaultValue={0}
          {...register("regularPrice", {
            required: "The regular price field is required",
          })}
        />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "The discount field is required",
            min: {
              value:
                getValues().regularPrice ||
                "The Discount should be less than the regular price",
            },
          })}
        />
      </FormRow2> */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "The discount field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "The Discount should be less than the regular price",
          })}
        />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "The description field is required",
          })}
        />
      </FormRow2> */}
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "The description field is required",
          })}
        />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow2> */}
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "The image field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  setShowForm: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
