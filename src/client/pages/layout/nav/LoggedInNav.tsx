import React from "react";
import { Link } from "react-router-dom";
import { JwtUser } from "@src/types/User.type";
import Avatar from "react-avatar";

export interface LoggedInProps {
  user?: JwtUser;
  onLogout?: () => void;
}

export default function LoggedIn({ user, onLogout }: LoggedInProps) {
  return (
    <>
      <li>{user.email}</li>
      <li>
        <Link to="/apps">My apps</Link>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
      <li>
        <Avatar
          name={user.firstName + " " + user.lastName}
          facebookId={user.facebookId}
          googleId={user.googleId}
          size="36"
          round={true}
        />
      </li>
    </>
  );
}
