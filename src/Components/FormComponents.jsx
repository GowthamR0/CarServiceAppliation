import { useEffect, useState } from 'react';
import BackArrow from '../Back Icon.svg';
import '../Css/FormComponent.css';
import { GetMemberShip, GetCarModel, GetLocation,PostUserData, UpdateUserData } from '../ServiceApi/ServiceApi';
import { useLocation, useNavigate } from 'react-router-dom';

//welcome
function FormComponents() {

    const {state}=useLocation();
    const navigate=useNavigate()
    //PS_AF_02 formdata objects
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        gender: '',
        dateOfBirth: '',
        contact: '',
        status: '',
        memberShipId: '',
        location: '',
        carModel: '',
        transmissionType: '',
        fuelType: ''
    });
    //PS_AF_03 intially fetch the data 
    useEffect(() => {
        bindMemberShipId()
        bindCarModel()
        if(state?.element){
            debugger
            console.log(state);
            bindLocation(state.element.MemberShipId)
            setFormData({
                id:state.element.Id,
                firstName: state.element.FirstName,
                lastName: state.element.LastName,
                emailAddress: state.element.EmailAddress,
                gender: state.element.Gender,
                dateOfBirth: state.element.DateOfBirth.split('T')[0],
                contact: state.element.Contact,
                status: state.element.Status?'Active':'Inactive',
                memberShipId: state.element.MemberShipId,
                location: state.element.LocationId,
                carModel: state.element.CarModel,
                transmissionType: state.element.TransmissionType,
                fuelType: state.element.FuelType
            })
            debugger
            console.log(state.element.CarModelId,'<<<<<<<<<<<<<<<<<<<fuel>>>>>>>>>>>>>>>>>>>>>>>>.')
        }
    },[])

    
    
    //PS_AF_02 bind StateVariable
    const [memberShipId, setMemberShipId] = useState([])
    //PS_AF_02 bind StateVariable
    const [carModel, setCarModel] = useState([])
    //PS_AF_02 bind StateVariable
    const [location, setLocation] = useState([])
    //PS_AF_08 fetch the data from database and bind in UI
    const bindMemberShipId = async () => {
    try{
        const response = await GetMemberShip()
        if(response.status===200){
            setMemberShipId(response.data)
           
            console.log(response.data)
        }
        else{
            console.log("MemberShip error 400")
        }
        console.log(formData,'>>>>>>>>>>>>>>>>>>>>>>>>>FORMDATA<<<<<<<<<<<<<<<<<<<<<<<<<<')
        
    } 
    catch(error){
        console.log("Error message 404")
    }
        
    }
    const bindCarModel = async () => {////PS_AF_04
        try{
            const response = await GetCarModel()
        if(response.status===200){
            
            setCarModel(response.data)
            
        }
        else{
            console.log("MemberShip error 400")
        }
        }
        catch(error){
            console.log("Error message 404")
        }
    }
    //PS_AF_12  bindLocation fetch the data from database
    const bindLocation = async (data) => {
        try{
            
            const response = await GetLocation(data)
            
            console.log(response ,'location');
            if(response.status===200){
                
                setLocation(response.data)
                
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>' +response.data)
                console.log(response.data)
            }
            else{
                console.log("MemberShip error 400")
            }
        }
        catch(error){
            console.log("Error message 404")
        }
    }
    
    //PS_AF_02 regex valiation
    const [errorMessage, setErrorMessage] = useState({
        firstName: false,
        lastName: false,
        emailAddress: false,
        contact: false
    })
    //PS_AF_02 Error Message
    const [firstNameEmptyError, setFirstNameEmptyError] = useState(false)
    const [lastNameEmptyError, setLastNameEmptyError] = useState(false)
    const [emailAddressEmptyError, setEmailAddressEmptyError] = useState(false)
    const [genderEmptyError, setGenderEmptyError] = useState(false)
    const [dateOfBirthEmptyError, setDateOfBirthEmptyError] = useState(false)
    const [contactEmptyError, setContactEmptyError] = useState(false)
    const [statusEmptyError, setStatusEmptyError] = useState(false)
    const [memberShipIdEmptyError, setMemberShipIdEmptyError] = useState(false)
    const [locationEmptyError, setLocationEmptyError] = useState(false)
    const [carModelEmptyError, setCarModelEmptyError] = useState(false)
    const [transmissionTypeEmptyError, setTransmissionTypeEmptyError] = useState(false)
    const [fuelTypeEmptyError, setFuelTypeEmptyError] = useState(false)


    // let location = [{ id: 0, value: 'select' }, { id: 1, value: 'chennai' }, { id: 2, value: 'theni' }, { id: 3, value: 'kerala' }];
    //PS_AF_17  SetData to fill the formdata objects
    const setData = (event) => {//
        setFormData({ ...formData, [event.target.name]: event.target.value });
        if(event.target.name==='memberShipId'){
            //setMemberShip(event.target.value)
            
            console.log(typeof(event.target.value))
            bindLocation(parseInt(event.target.value))
            console.log(event.target.value);
        }
        //PS_AF_33 to PS_AF_46 Validation
        validation(event)
    };
    //PS_AF_33 to PS_AF_46 Validatio 
    const validation = (event) => {
        const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{1,10}$/
        if (event.target.name === 'firstName') {
            setFirstNameEmptyError(false)
            if (!nameRegex.test(event.target.value)) {
                setErrorMessage({ ...errorMessage, [event.target.name]: true })
            }
            else {
                setErrorMessage({ ...errorMessage, [event.target.name]: false })
            }
        }
         if (event.target.name === 'lastName') {
            setLastNameEmptyError(false)
            if (!nameRegex.test(event.target.value)) {
                setErrorMessage({ ...errorMessage, [event.target.name]: true })
            }
            else {
                setErrorMessage({ ...errorMessage, [event.target.name]: false })
            }
        }
         if (event.target.name === 'emailAddress') {
            setEmailAddressEmptyError(false)
            if (!emailRegex.test(event.target.value)) {
                setErrorMessage({ ...errorMessage, [event.target.name]: true })
            }
            else {
                setErrorMessage({ ...errorMessage, [event.target.name]: false })
            }

        }
         if (event.target.name === 'contact') {
            setContactEmptyError(false)
            if (!contactRegex.test(event.target.value)) {
                setErrorMessage({ ...errorMessage, [event.target.name]: true })
            }

            else {
                setErrorMessage({ ...errorMessage, [event.target.name]: false })
            }

        }
        if(event.target.name==='gender'){
            setGenderEmptyError(false)
        }
        if(event.target.name==='dateOfBirth'){
            setDateOfBirthEmptyError(false)
        }
        if(event.target.name==='status'){
            setStatusEmptyError(false)
        }
        if(event.target.name==='memberShipId'){
            setMemberShipIdEmptyError(false)
        }
        if(event.target.name==='location'){
            setLocationEmptyError(false)
        }
        if(event.target.name==='carModel'){
            setCarModelEmptyError(false)
        }
        if(event.target.name==="transmissionType"){
            setTransmissionTypeEmptyError(false)
        }
        if(event.target.name==='fuelType'){
            setFuelTypeEmptyError(false)
        }
    }
    const emptyvalidation = () => {
        let errorCheck=false
        if (formData.firstName === '' || errorMessage.firstName === true) {
            
            setFirstNameEmptyError(true)
            errorCheck=true
        }
         if (formData.lastName === '' || errorMessage.lastName === true) {
            setLastNameEmptyError(true)
            errorCheck=true
        }
         if (formData.emailAddress === '' || errorMessage.emailAddress === true) {
            setEmailAddressEmptyError(true)
            errorCheck=true
        }
         if (formData.gender === '') {
            setGenderEmptyError(true)
            errorCheck=true
        }
         if (formData.dateOfBirth === '') {
            setDateOfBirthEmptyError(true)
            errorCheck=true
        }
         if (formData.contact === '' || errorMessage.contact === true ||formData.contact.length<=9) {
            setContactEmptyError(true)
            errorCheck=true
        }
         if (formData.status === '') {
            setStatusEmptyError(true)
            errorCheck=true
        }
         if (formData.memberShipId === '') {
            setMemberShipIdEmptyError(true)
            errorCheck=true
        }
         if (formData.location === '') {
            setLocationEmptyError(true)
            errorCheck=true
        }
         if (formData.carModel === '') {
            setCarModelEmptyError(true)
            errorCheck=true
        }
         if (formData.transmissionType === '') {
            setTransmissionTypeEmptyError(true)
            errorCheck=true
        }
        if(formData.fuelType==='') {
            setFuelTypeEmptyError(true)
            errorCheck=true
        }
        
        if(!errorCheck){
            submit()
            
        }
        

    }
    const submit =async () => {
        let record={}
        let response=0
        if(state!==null){
            debugger
            console.log(formData)
           record=//PS_AF_52 EditFunction
           { 
                
                Id:state.id,
                FirstName:formData.firstName,
                LastName:formData.lastName,
                EmailAddress:formData.emailAddress,
                Gender:formData.gender,
                DateOfBirth:formData.dateOfBirth,
                Contact:formData.contact,
                Status:Boolean(formData.status==='Active'?true:false ),
                MemberShipId:Number(formData.memberShipId),
                Location_id:Number(formData.location),
                CarModel:Number(formData.carModel),
                TransmissionType:formData.transmissionType,
                FuelType:formData.fuelType
}
debugger
        response=await PostUserData(record)
        }
        else{
              
        record={//PS_AF_52 Submit Function
            
            Id:0,
            FirstName:formData.firstName,
            LastName:formData.lastName,
            EmailAddress:formData.emailAddress,
            Gender:formData.gender,
            DateOfBirth:formData.dateOfBirth,
            Contact:formData.contact,
            Status:Boolean(formData.status==='Active'?true:false),
            MemberShipId:Number(formData.memberShipId),
            Location_id:Number(formData.location),
            CarModel:Number(formData.carModel),
            TransmissionType:formData.transmissionType,
            FuelType:formData.fuelType
            
        
    }
    console.log(record,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
     response=await PostUserData(record)
        }
      
        //PS_AF_52
        debugger
        console.log(response)
        if(response.status===200){
            alert(response.data)
            setFormData({
                firstName: '',
                lastName: '',
                emailAddress: '',
                gender: '',
                dateOfBirth: '',
                contact: '',
                status: '',
                memberShipId: '',
                location: '',
                carModel: '',
                transmissionType: '',
                fuelType: ''
            });
            navigate('/grid')
        }
        else{
            alert(response.errMsg)
        }
        console.log(response)

        

    }

    function onCancel(){
        setFormData({
            firstName: '',
            lastName: '',
            emailAddress: '',
            gender: '',
            dateOfBirth: '',
            contact: '',
            status: '',
            memberShipId: '',
            location: '',
            carModel: '',
            transmissionType: '',
            fuelType: ''
        });
       }

    return (
        <div className='Page-Body'>
            <div className='Header'>
                <img src={BackArrow} alt="BackArrow" className='Header-BackArrow' onClick={()=>{navigate('/grid')}}/>

                {/* <button >
                </button> */}
                <h3 className='Header-Title'>Add New Customer</h3>
            </div>
            <div className='Body-content'>

                <form action='' className=''>
                    <h5 className='FirstTitle'>Basic Information</h5>
                    <div className='First-row'>
                        <div className='inputField'>
                            <label htmlFor='firstName'>FirstName<span className='errorMessage'>*</span></label>
                            <input type='text' value={formData.firstName} name='firstName' id='firstName' placeholder='firstName' onChange={(e) => setData(e)} />
                            {errorMessage.firstName && (<p className='errorMessage'>Enter valid FirstName</p>)}
                            {firstNameEmptyError && (<p className='errorMessage'>Fill the FirstName</p>)}
                        </div>

                        <div className='inputField'>
                            <label htmlFor='lastName'>LastName<span className='errorMessage'>*</span></label>
                            <input type='text' value={formData.lastName} name='lastName' id='lastName' placeholder='lastName' onChange={(e) => setData(e)} />
                            {errorMessage.lastName && (<p className='errorMessage'>Enter valid LastName</p>)}
                            {lastNameEmptyError && (<p className='errorMessage'>Fill the LastName</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor='emailAddress'>Email Address<span className='errorMessage'>*</span></label>
                            <input type='text' value={formData.emailAddress} name='emailAddress' id='emailAddress' placeholder='email' onChange={(e) => setData(e)} />
                            {errorMessage.emailAddress && (<p className='errorMessage'>Enter valid Email</p>)}
                            {emailAddressEmptyError && (<p className='errorMessage'>Fill the Email_Address</p>)}
                        </div>
                    </div>
                    <div className='First-row'>
                        <div className='inputField'>
                            <label htmlFor='Gender'> Gender<span className='errorMessage'>*</span></label>
                            <input type="radio" id='Male' name='gender' value='Male' checked={formData.gender === 'Male'} onChange={(e) => setData(e)} />
                            <label htmlFor="Male" className='gender-btn'>Male</label>
                            <input type="radio" id='Female' name='gender' value='Female' checked={formData.gender === 'Female'} onChange={(e) => setData(e)} />
                            <label htmlFor="Female" className='gender-btn'>Female</label>
                            {genderEmptyError && (<p className='errorMessage'>Select the Gender</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor="dateOfBirth">Date Of Birth<span className='errorMessage'>*</span></label>
                            <input type="date" value={formData.dateOfBirth} name='dateOfBirth' id='dateOfBirth' onChange={(e) => setData(e)} />
                            {dateOfBirthEmptyError && (<p className='errorMessage'>Fill the Date_Of_Birth</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor="contact">Contact#<span className='errorMessage'>*</span></label>
                            <input type="text" value={formData.contact} name='contact' id='contact' placeholder='Enter Contact#' onChange={(e) => setData(e)} />
                            {errorMessage.contact && (<p className='errorMessage'>Enter valid Contact</p>)}
                            {contactEmptyError && (<p className='errorMessage'>Fill the Contact_Number</p>)}
                        </div>
                    </div>
                    <div className='First-row'>
                        <div className='inputField'>
                            <label htmlFor='Status'> Status<span className='errorMessage'>*</span></label>
                            <input type="radio" id='Active' name='status' value='Active' checked={formData.status === 'Active'} onChange={(e) => setData(e)} />
                            <label htmlFor="Active" className='gender-btn'>Active</label>
                            <input type="radio" id='Inactive' name='status' value='Inactive' checked={formData.status === 'Inactive'} onChange={(e) => setData(e)} />
                            <label htmlFor="Inactive" className='gender-btn'>Inactive</label>
                            {statusEmptyError && (<p className='errorMessage'>Select the Status</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor="Membership">Membership<span className='errorMessage'>*</span></label>
                            <select name="memberShipId" id="memberShipId" value={formData.memberShipId} onChange={(e) => { setData(e); }}>
                                <option value={0}>select</option>
                                {memberShipId.map ((ele) => (
                                    <option key={ele.id} value={ele.MemberShipId}>{ele.MemberShip}</option>//membership_type
                                ))}
                            </select>
                            {memberShipIdEmptyError && (<p className='errorMessage'>Select the MemberShip</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor="location">Location<span className='errorMessage'>*</span></label>

                            <select value={formData.location} name='location' onChange={(e) => setData(e)}>
                                <option value={0}>select</option>
                                {
                                    location?.map((ele) => (
                                        <option key={ele.LocationId} value={ele.LocationId}>{ele.Location }</option>
                                    ))
                                }
                            </select>

                            {locationEmptyError && (<p className='errorMessage'>Select the Location</p>)}
                        </div>
                    </div>
                    <h3>Car Details</h3>
                    <div className='First-row'>
                        <div className='inputField'>
                            <label htmlFor="carModel">Car Model<span className='errorMessage'>*</span></label>
                            <select name="carModel" id="carModel" value={formData.carModel} onChange={(e) => setData(e)}>
                            <option value={0}>select</option>
                                {carModel.map((ele) => (
                                    <option key={ele.CarModel} value={ele.CarModel}>{ele.CarModelType}</option>
                                ))}
                            </select>
                            {carModelEmptyError && (<p className='errorMessage'>Select The CarModel</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor='TransmissionType'> Transmission Type<span className='errorMessage'>*</span></label>
                            <input type="radio" id='Manual' name='transmissionType' value='Manual' checked={formData.transmissionType === 'Manual'} onChange={(e) => setData(e)} />
                            <label htmlFor="Manual" className='transmissionType-btn'>Manual</label>
                            <input type="radio" id='Automatic' name='transmissionType' value='Automatic' checked={formData.transmissionType === 'Automatic'} onChange={(e) => setData(e)} />
                            <label htmlFor="Automatic" className='transmissionType-btn'>Automatic</label>
                            {transmissionTypeEmptyError && (<p className='errorMessage'>Select the Transmission_Type</p>)}
                        </div>
                        <div className='inputField'>
                            <label htmlFor='FuelType'> Fuel Type<span className='errorMessage'>*</span></label>
                            
                            <input type="radio" id='petrol' name='fuelType' value='Petrol' checked={formData.fuelType === 'Petrol'} onChange={(e) => setData(e)} />
                            <label htmlFor="petrol" className='transmissionType-btn'>Petrol</label>
                            <input type="radio" id='diesel' name='fuelType' value='Diesel' checked={formData.fuelType ==='Diesel'} onChange={(e) => setData(e)} />
                            <label htmlFor="diesel" className='transmissionType-btn'>Diesel</label>
                            {fuelTypeEmptyError && (<p className='errorMessage'>Select the Fuel_Type</p>)}
                        </div>
                    </div>
                </form>            
            </div>
            <div className='buttonStyle'>
                <button type='reset' className='btn-cancel' onClick={()=>{onCancel()}}>cancel</button>
                <button type='submit' className='btn-submit' onClick={() => { emptyvalidation() }}>Submit</button>
            </div>
            
        </div>
    )
}

export default FormComponents;