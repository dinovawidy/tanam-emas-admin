import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const success = (message) => {
  MySwal.fire({
    toast: true,
    position: "top",
    text: message,
    showCancelButton: false,
    showConfirmButton: false,
    timer: 3000,
    background: "#5D7D73",
    color: "#fff",
    width: 600,
  });
};

const responseValidate = (title, message) => {
  MySwal.fire({
    icon: "error",
    title: title,
    text: message,
  });
};

const loadingAlert = () => {
  Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

const PopupUtility = {
  success,
  responseValidate,
  loadingAlert,
};

export default PopupUtility;
