import { useState } from "react";

const useModalControl = (init) => {
  const [isShowModal, setShowModal] = useState(init);
  const openModWin = (_) => setShowModal(true);
  const closeModWin = (_) => setShowModal(false);

  return { isShowModal, openModWin, closeModWin };
};

export default useModalControl;
