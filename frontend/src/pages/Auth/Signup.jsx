import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  // Handle sign up form submit

  const handleSignUp = async (e) => {
    e.preventDefault() ; 

    let profileImageUrl = '' ; 

    if(!fullName){
      setError('Plese enter your name.')
      return ; 
    }

    if(!validateEmail(email)){
      setError('Please enter a valid email address.')
      return ; 
    }

    if(!password){
      setError('Please enter the password.')
      return ; 
    }

    // SignUp API Call 

    try{

      // Upload image if present 

      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic) ; 
        profileImageUrl = imgUploadRes.imageUrl || "" ; 
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName, 
        email, 
        password, 
        profileImageUrl
      })

      const {token, user} = response.data ; 

      if(token){
        localStorage.setItem('token', token) ; 
        updateUser(user) ; 
        navigate('/dashboard')
      }

    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message) 
      }
      else{
        setError('Something went wrong! Please try again.')
      }
    }

  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="max-w-md grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johndoe@gmail.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button type="submit" className="btn-primary mt-2 max-w-md">
            SIGN UP
          </button>

          {/* Login Link */}

          <p className="text-sm text-slate-800 text-center max-w-md mt-2">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline hover:text-purple-600 hover:font-bold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
