import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialclick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{
          marginBottom: 30,
        }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialclick} name="google" className="authBtn">
          Google 계정으로
          <br />
          로그인 하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialclick} name="github" className="authBtn">
          Git Hub 계정으로
          <br />
          로그인 하기 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
