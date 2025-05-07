import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewManagers() 
{
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState("");
    const displayManagers = async () => 
      {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewalleventmanagers`);
            setManagers(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch event managers data ... " + err.message);
        } 
    };

    useEffect(() => {
      displayManagers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
                <u>View All Event Managers</u>
            </h3>

            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : managers.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Event Managers Data Found
                </p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Company Name</th>
                            <th>Company Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.id}>
                                <td>{manager.id}</td>
                                <td>{manager.name}</td>
                                <td>{manager.gender}</td>
                                <td>{manager.dob}</td>
                                <td>{manager.email}</td>
                                <td>{manager.username}</td>
                                <td>{manager.mobileno}</td>
                                <td>{manager.company_name}</td>
                                <td>{manager.company_location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}