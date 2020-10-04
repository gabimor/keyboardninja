import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/Buttons";

export default function Anonymous() {
  const a = 1;

  return (
    <ul>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/signup">
          <PrimaryButton>Sign up</PrimaryButton>
        </Link>
      </li>
    </ul>
  );
}
