import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import '../Css/Grid.css'
import { IoFilterCircleOutline } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import { BiDownArrowAlt } from "react-icons/bi";
import { getDataApi } from '../ServiceApi/ServiceApi';
import Model from 'react-modal';
import { GetMemberShip, GetLocation } from '../ServiceApi/ServiceApi';
function Grid() {

    const [pageData, setpageData] = useState([])
    const [memberShipId, setMemberShipId] = useState([])
    const [location, setLocation] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showFilterData, setShowFilterData] = useState(false)
    const[showLoadMore,setShowLoadMore]=useState(true)
    const navigation = useNavigate();
    //PS_AF_1 State Variable payload for all service Api
    const [tableDataPayLoad, setTableDataPayLoad] = useState({

        search: "", 
        filter: {
            Membership: 0,
            Location: 0,
            status: true

        },
        sort: {
            column: 'car_wash_customer.id',
            order: 'ASC'
        },
        loadMore: 10

    })
    //PS_AF_3 useeffect to bind GridData and membership in filter
    useEffect(() => {

        BindGridData(tableDataPayLoad)
        bindMemberShipId()

    }, [tableDataPayLoad])
    const BindGridData = async (data) => {
        const response = await getDataApi(data)

        console.log(response,">>>>>>>>>>>>>>>>>>>>>>>>>>>STATUS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        if (response.status === 200) {
            setpageData(response.data)
            response.data.length===tableDataPayLoad.loadMore?setShowLoadMore(true):setShowLoadMore(false)

        }
        console.log(pageData);

    }
    const bindMemberShipId = async () => {//PS_AF_09

        try {
            const response = await GetMemberShip()
            if (response.status === 200) {
                setMemberShipId(response.data)
            }
            else {
                console.log("MemberShip error 400")
            }

        }
        catch (error) {
            console.log("Error message 404")
        }

    }
    const bindLocation = async (data) => {//PS_AF_19

        try {
            const response = await GetLocation(data)
            console.log(response, 'location');
            if (response.status === 200) {
                setLocation(response.data)
            }
            else {
                console.log("MemberShip error 400")
            }
        }
        catch (error) {
            console.log("Error message 404")
        }
    }
    const [value, setValue] = useState({
        memberShipId: 0,
        location: 0,
        status: ''
    })
    const [sorting, setsorting] = useState(false)
    const setData = (event) => {//PS_AF_31
        if (event.target.name === 'memberShipId') {

            setValue({ ...value, [event.target.name]: event.target.value })
            debugger
            console.log(event.target.value)
            bindLocation(parseInt(event.target.value))
            console.log(event.target.value)
        }
        if (event.target.name === 'location') {
            setValue({ ...value, [event.target.name]: event.target.value })
            console.log(event.target.value)
        }
        if (event.target.name === 'status') {
            setValue({ ...value, [event.target.name]: event.target.value })
            console.log(event.target.value)
        }

    }
    //PS_AF_24 - This is search method
    const search = (event) => {
        if (event.key === 'Enter') {
            setTableDataPayLoad({ ...tableDataPayLoad, search: event.target.value })


        }
    }
    //PS_AF_30 it enable filterIcon 
    function showFilterIcon() {
        setShowFilterData(true)
    }
    //PS_AF_34 it store filter value's
    const submit = () => {
        setTableDataPayLoad({
            ...tableDataPayLoad, filter: {
                "membership": parseInt(value.memberShipId),
                "location": parseInt(value.location),
                "status": value.status === "Active" ? true : false
            }

        })
        debugger
        console.log(value)

        setShowFilterData(false)
    }

    // let memberShipId = [{ id: 0, value: 'select' }, { id: 1, value: 'chennai' }, { id: 2, value: 'theni' }, { id: 3, value: 'kerala' }];
    // let location = [{ id: 0, value: 'select' }, { id: 1, value: 'chennai' }, { id: 2, value: 'theni' }, { id: 3, value: 'kerala' }];
    //PS_AF_47 it will increment the loadMore count by 10
    const loadMoreCount = () => {
        debugger
        
        console.log(tableDataPayLoad)
        setTableDataPayLoad({ ...tableDataPayLoad, loadMore: tableDataPayLoad.loadMore + 10 })
        console.log(tableDataPayLoad)
        

    }
    //PS_AF_40 sotring the data with Ascending and descending order
    const sortingData = (name, s) => {

        console.log(name, s)
        setTableDataPayLoad({
            ...tableDataPayLoad, sort: {
                column: name,
                order: s
            }
        })
        setsorting(sorting ? false : true)

    }

    return (
        <div>
            <div className='Header-nav'>
                <h3 className='Header-title'>Manage Customers</h3>
                <input className='Header-search' type="num" placeholder='search' onKeyUp={(e) => { search(e) }} />
                <p className='Header-Filter'><IoFilterCircleOutline size='2.5rem' color='black' onClick={() => showFilterIcon()} /></p>
                <button className='Header-Customer' onClick={() => { (navigation('/form')) }}>+ New Customer</button>
            </div>

            <Model isOpen={showFilterData} className='FilterStyle'  >
                <div className='modelrow'>
                    <div className='inputField1'>
                        <label className='lab' htmlFor="Membership">Membership</label>
                        <select name="memberShipId" id="memberShipId" onChange={(e) => setData(e)}>
                            <option value={0}>select</option>
                            {memberShipId.map((ele) => (
                                <option key={ele.id} value={ele.MemberShipId}>{ele.MemberShip}</option>
                            ))}
                        </select>
                    </div>

                    <div className='inputField1'>
                        <label className='lab' htmlFor="location">Location</label>

                        <select name='location' onChange={(e) => setData(e)}>
                            <option value={0}>select</option>
                            {
                                location?.map((ele) => (
                                    <option key={ele.LocationId} value={ele.LocationId}>{ele.Location}</option>//
                                ))
                            }
                        </select>
                    </div>
                    <div className='inputField1'>
                        <label className='lab' htmlFor='Status'> Status</label>
                        <div className='gender-radio'>
                            <input type="radio" id='Active' name='status' value='Active' onChange={(e) => setData(e)} />
                            <label htmlFor="Active" className='gender-btn lab'>Active</label>
                            <input type="radio" id='Inactive' name='status' value='Inactive' onChange={(e) => setData(e)} />
                            <label htmlFor="Inactive" className='gender-btn lab'>Inactive</label>
                        </div>

                    </div>
                    <div className='btn'>
                        <button className='btn-filter' onClick={() => { submit() }}>Filter</button>
                    </div>


                </div>

            </Model>



            <table className='table-style'>
                <div className='Inner-table'>
                    <thead>
                        <tr>
                            <th id='CustomerID'>CustomerID</th>
                            <th id='First_Name'>First Name {!sorting && <span className='arrow' name='first_name' value='asc' onClick={(e) => { sortingData('first_name', 'asc') }}><BiUpArrowAlt size='1.3rem' /></span>}
                                {sorting && <span className='arrow' name='first_name' value='desc'><BiDownArrowAlt size='1.3rem' onClick={(e) => { sortingData('first_name', 'desc') }} /></span>}
                            </th>
                            <th id='Last_Name'>Last Name</th>

                            <th id='Email_Address'>Email Address{!sorting && <span className='arrow' name='email_address' value='asc' onClick={(e) => { sortingData('email_address', 'asc') }}><BiUpArrowAlt size='1.3rem' /></span>}
                                {sorting && <span className='arrow' name='email_address' value='desc'><BiDownArrowAlt size='1.3rem' onClick={(e) => { sortingData('email_address', 'desc') }} /></span>}
                            </th>
                            <th id='Membership'>Membership</th>
                            <th id='Location'>Location</th>
                            <th id='Status'>Status</th>
                            <th id='Action'>Action</th>

                        </tr>

                    </thead>
                    <tbody>
                        {
                            pageData?.map((ele, ind) => (
                                <tr key={ele.ind}>
                                    <td id='Value_CustomerID'>{ele.Id}</td>
                                    <td id='First_Name'>{ele.FirstName}</td>
                                    <td id='Last_Name'>{ele.LastName}</td>
                                    <td id='Email_Address'>{ele.EmailAddress}</td>
                                    <td id='Membership'>{ele.MembershipType}</td>
                                    <td id='Location'>{ele.Location}</td>
                                    <td id='Status'>{(ele.Status) ? <span className='status1-btn'>Active</span> : <span className='status-btn'>Inactive</span>}</td>
                                    <td id='Action'><GrUpdate onClick={() => { navigation('/form', { state: { element: ele,id:ele.Id } }) }} /></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </div>

            </table>
            <div className='Footer'>
                {
                    showLoadMore&&(
                        <button className='Footer-LoadMore' onClick={() => loadMoreCount()}>LoadMore</button>
                    )
                }
                
            </div>

        </div>
    )
}
export default Grid;