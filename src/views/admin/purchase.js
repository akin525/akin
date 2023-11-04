import React, {useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import axios from "axios";
import gh from 'lg.png'

export default function Purchase({color}) {
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://server.savebills.com.ng/api/auth/purchase";
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10; // Number of items to display per page
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    let token=localStorage.getItem('dataKey');
    const columns = [
        { name: 'username', header: 'Username', minWidth: 50, defaultFlex: 2 },
        { name: 'refid', header: 'Refid', maxWidth: 1000, defaultFlex: 1 },
        { name: 'plan', header: 'Plan', minWidth: 50, defaultFlex: 2 },
        { name: 'phone', header: 'Number', minWidth: 50, defaultFlex: 2 },
        { name: 'createdAt', header: 'Date', minWidth: 50, defaultFlex: 2 },

    ];
    const gridStyle = { minHeight: 550 };

    function myCallback(data) {

    }

    function contactCallback(data) {
    }
    React.useEffect(() => {

        setLoading(true);
        try {
            window.web2app.advert.showinterstitial(myCallback);

        }catch (e) {
            console.log("Can not excecute for now");
        }
        axios
            .get(baseURL2, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                console.log(setMessage);
                setuserid(response.data.id);
                setdatass(response.data.bill);
                setLoading(false);

                console.log(response.data);

            });

    }, [token]);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const filteredData = datass.filter(
        person => {
            if (datass.length ===0) return [];
            return (
                person
                    .username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .amount
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .createdAt
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||person
                    .refid
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
    );

    const offset = currentPage * perPage;
    const currentPageData = filteredData.slice(offset, offset + perPage);

    return (
        <>
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>History</h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap mt-4">

                    <ReactDataGrid
                        idProperty="id"
                        columns={columns}
                        dataSource={datass}
                        style={gridStyle}
                    />
                    {loading === true ? ( <div className="overlay">
                        <div className="loader"></div>
                    </div> ):null}
                </div>
            </div>

            </>
    );
}

