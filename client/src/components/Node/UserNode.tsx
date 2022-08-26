import React from "react";
import { deleteUser } from "../../requests/user";

interface Props {
    user: Neo4jOrgChart.User;
    onDeleteUser: () => void;
}

const UserNode: React.FC<Props> = ({ user, onDeleteUser }) => {
    const handleDeleteUser = async () => {
        await deleteUser(user.id);
        onDeleteUser();
    };

    return (
        <div className="node">
            <div className="node-header">
                {user.lastName}, {user.firstName}
            </div>
            <div className="node-content">{user.occupation}</div>
            <div className="node-footer">
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>
            <br />
        </div>
    );
};

export default UserNode;
