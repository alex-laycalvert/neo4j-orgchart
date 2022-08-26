import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../requests/user";
import CreateUserForm from "../CreateUserForm";
import UserNode from "../Node/UserNode";

const OrgChartPage: React.FC = () => {
    const [users, setUsers] = useState<Neo4jOrgChart.User[]>([]);

    const fetchUsers = async () => {
        const res = await getAllUsers();
        setUsers(res.data);
    };

    const onCreateUser = async () => {
        fetchUsers();
    };

    const onDeleteUser = async () => {
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="orgchart">
            <h1>Org Chart</h1>
            <CreateUserForm onCreateUser={onCreateUser} />
            <br />
            {users.map((user) => {
                return (
                    <UserNode
                        key={user.id}
                        user={user}
                        onDeleteUser={onDeleteUser}
                    />
                );
            })}
        </div>
    );
};

export default OrgChartPage;
