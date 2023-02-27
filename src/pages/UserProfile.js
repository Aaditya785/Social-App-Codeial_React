import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast, Toaster } from 'react-hot-toast';
import { Loader } from '../components';
import { useAuth } from '../hooks';
// import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setrequestInProgress] = useState(false);
  const  {userId}  = useParams();
  const navigate = useNavigate();
  const auth = useAuth();


  useEffect( ()=>{
    const getUser = async ()=>{
      const response =  await fetchUserProfile(userId);

      // console.log("This response is of fetchUserProfile:",response);  

      if(response.success){
        setUser(response.data.user);
      }else{
        // use History to go to "/"
        toast.error(response.message);
        return navigate("/");
      }
      setLoading(false);
    }
    getUser();
  } ,[userId, navigate]);

  if(loading){
    return <Loader/>;
  }

  const checkIfUserIsAFriend = ()=>{
    const friends = auth.user.friends;
    console.log("friends",auth.user);
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if(index !== -1 ){
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async ()=>{
    setrequestInProgress(true);


    const response = await removeFriend(userId);

    if(response.success){
      const { friendships } = response.data;

      auth.updateUserFriends(true, friendships);

      toast.success('Friend added Successfully!..')
    }else{
      toast.error(response.message);
    }
    setrequestInProgress(false);
  };

  const handleAddFriendClick = async ()=>{
    setrequestInProgress(true);


    const response = await addFriend(userId);

    if(response.success){
      const { friendships } = response.data;

      auth.updateUserFriends(true, friendships);

      toast.success('Friend added Successfully!..')
    }else{
      toast.error(response.message);
    }
    setrequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>

      {/* <button className={`button ${styles.saveBtn}`}>Remove friend</button>

      <button className={`button ${styles.saveBtn}`}>Add friend</button> */}


        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress} > {requestInProgress ? 'Adding Friend...' : 'Add friend'} </button>
        )
      }

      </div>
      <Toaster/>
    </div>
  );
};

export default UserProfile;
