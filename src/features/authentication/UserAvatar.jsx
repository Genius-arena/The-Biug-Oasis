import styled from "styled-components";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import default_img from '../../data/img/default-user.jpg'
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar () {
  const { user, isLoading } = useUser();
  console.log(user, 'LooooXR123456')

  // const {  avatar } = user.user_metadata;
  

  // const fullName ="kk@@k";
  // const avatar ="htttps://jfjngng.co";

  
if (isLoading) return <SpinnerMini/>

const { fullName, avatar } = user?.user_metadata || "No-name";

 console.log(fullName, 'NNoooor')   
  console.log(user);

  return (
    <div>
      <Avatar
        src={avatar || default_img}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
      <StyledUserAvatar />
    </div>
  );
}

export default UserAvatar;
