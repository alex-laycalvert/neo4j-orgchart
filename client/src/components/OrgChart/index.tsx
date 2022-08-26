import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../requests/user";
import CreateUserForm from "../CreateUserForm";

const OrgChartPage: React.FC = () => {
    const [users, setUsers] = useState<Neo4jOrgChart.User[]>([]);

    const fetchUsers = async () => {
        const res = await getAllUsers();
        setUsers(res.data);
    };

    const onCreateUser = async () => {
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="orgchart">
            <h1>Org Chart</h1>
            <CreateUserForm onCreateUser={onCreateUser} />
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h3>
                            {user.lastName}, {user.firstName}
                        </h3>
                        <p>
                            ID: {user.id}
                            <br />
                            Occupation: {user.occupation}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default OrgChartPage;
