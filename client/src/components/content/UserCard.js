import React from "react";
import { Card } from "semantic-ui-react";
import "./UserCard.scss";

export default function UserCard(props) {
  console.log("UserCard: Props: ", props);

  return (
    <div className="card-list">
      <Card header={props.user.username} meta="User" />
    </div>
  );
}
