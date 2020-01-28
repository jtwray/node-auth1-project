import React from "react";
import { Card } from "semantic-ui-react";

export default function UserCard(props) {
  console.log("UserCard: Props: ", props);

  return (
    <div>
      <Card
        header={props.user.username}
        meta="User"
      />
    </div>
  );
}
