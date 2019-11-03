import React, { Component, createContext } from "react";
import { auth, createUserProfileDocument } from "../firebase";
import { withRouter } from 'react-router-dom';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  state = {
    user: null
  };

  unsubscribefromAuth = null;

  componentDidMount = async () => {
    this.unsubscribefromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          // if user signs in again and they verified their email, update user properties
          // if(!snapshot.data().emailVerified && userAuth.emailVerified){
          //   // update user profile on DB
          //   firestore.doc(`/users/${snapshot.id}`).update({ emailVerified: userAuth.emailVerified })
          //   // console.log("UPDATING emailVerified")
          // }
          this.setState({ user: { id: snapshot.id, ...snapshot.data() } });
        });
        // console.log("userAuth: ", userAuth)
      } else{
        const restrictedEndpoints = ['xxxx']
        if(restrictedEndpoints.includes(window.location.pathname)){
          
          // redirect if user isn't allowed to access specific pages
          // console.log("redirecting ...")
          this.props.history.push('/signin')
        }
      }

      // console.log("USER: ", userAuth);
      this.setState({ user: userAuth });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribefromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default withRouter(UserProvider);
