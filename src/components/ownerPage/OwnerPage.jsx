import { useState, useContext, useEffect } from "react";
import AddNewAppointmensForm from "../addNewAppointmentsForm/AddNewAppointmentsForm";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { ShopContext } from "../../services/shop/ShopContext";
import OwnerAppointmentsList from "../ownerAppointmentsList/OwnerAppointmentsList";
import OwnerProviderButtonList from "../ownerProviderButtonList/OwnerProviderButtonList";
import './Sidebar.css';
import OwnerSection from "./OwnerSection";
import sidebar from './executiveSidebar.png';

const OwnerPage = () => {

    const [showDateAppointmentForm, setShowDateAppointmentForm] = useState(false);
    const [showList, setShowList] = useState(false);
    const [providerAppointments, setProviderAppointments] = useState("");
    const [providerFlag, setProviderFlag] = useState(false);
    const [showProvList, setShowProvList] = useState(false);

    const { token, user } = useContext(AuthenticationContext);
    const { myShopAppointments, myShopEmployees, reqEmpHandler, reqAppHandler, reqLastAppHandler } = useContext(ShopContext);

    //Guardar el shopId del Owner
    /*const fetchDataUser = async () => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/Owner/GetOwnerById/${user.id}`,
                {
                    method: "GET",
                    mode: "cors"
                }
            );
            if (!response.ok) {
                throw new Error("Error in obtaining user");
            }
            const data = await response.json();
            setShopId(data.shopId);
            //console.log("xxx")
        } catch (error) {
            console.error("Error:", error);
        }
    };*/

    const onClickShowDateAppointmentsForm = () => {
        if (!showDateAppointmentForm) {
            reqLastAppHandler();
            setShowList(false);
            setShowProvList(false);
            setShowDateAppointmentForm(true);
        }
    };

    const onClickOcultDateAppointmentsForm = () => {
        if (showDateAppointmentForm) {
            setShowDateAppointmentForm(false);
        }
    };

    const onClickShowList = () => {
        if (!showList) {
            reqAppHandler()
            setShowProvList(false);
            setShowDateAppointmentForm(false);
            setShowList(true);
        }
    };

    const onClickOcultList = () => {
        if (showList) {
            setShowList(false);
        }
    };

    const onClickOcultOtherViews = () => {
        onClickOcultDateAppointmentsForm();
        onClickOcultList();
        //setShowProvList(false);
    };

    const setProviderAppArray = (data) => {
        setProviderAppointments(data);
        setShowProvList(true)
    };

    const onClickShowAppByProvider = () => {
        if (!providerFlag) {
            setProviderFlag(true);
        } else {
            setProviderFlag(false);
        }
    };

    useEffect(() => {
        reqEmpHandler();
    }, []);

    return (
        <>
            <div className="d-flex w-100 " style={{ height: "95vh", width: "95%" }}>
                <div className="sidebar">
                    <button
                        onClick={onClickShowList}
                        className="sidebar-button">
                        MOSTRAR TODOS LOS TURNOS
                    </button>
                    <button
                        onClick={onClickShowAppByProvider}
                        className="sidebar-button">
                        MOSTRAR TURNOS POR PROVEEDOR
                    </button>
                    {providerFlag && (
                        <OwnerProviderButtonList
                            me={user}
                            myShopEmployees={myShopEmployees}
                            token={token}
                            setProviderAppArray={setProviderAppArray}
                            ocultOtherviews={onClickOcultOtherViews}
                        />
                    )}
                    <button
                        onClick={onClickShowDateAppointmentsForm}
                        className="sidebar-button"
                    >
                        AGREGAR NUEVOS TURNOS
                    </button>
                    <img
                        className="executiveSidebar"
                        src={sidebar}
                        alt="Logo"
                    />
                </div>
                <div className="bg-light border rounded m-2 py-4 d-flex justify-content-center align-items-center overflow-auto" style={{ height: "87vh", width: "95%" }}>
                    {!showDateAppointmentForm && !showList && !showProvList ? <OwnerSection /> : ""}
                    {showDateAppointmentForm ? <AddNewAppointmensForm
                        token={token}
                        onClickOccultForm={onClickOcultDateAppointmentsForm}
                    /> : ""}
                    {showList ? <OwnerAppointmentsList
                        appointmentsArray={myShopAppointments}
                        employeesArray={myShopEmployees}
                    /> : ""}
                    {showProvList ? <OwnerAppointmentsList
                        appointmentsArray={providerAppointments}
                        employeesArray={myShopEmployees}
                    /> : ""}
                </div>
            </div>
        </>
    );
};
export default OwnerPage;