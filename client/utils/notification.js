import { toast } from 'react-toastify';

export const notification = (status, message, id="notification", autoClose = true  ) => {
  let settings = {
    position: 'top-right',
    autoClose: autoClose ? 5000: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    toastId: id
  };

  status === 'success' && toast.success(message, settings);
  status === 'warn' && toast.warn(message, settings);
  status === 'error' && toast.error(message, settings);
  typeof status === 'undefined' && toast.info(message, settings);
};