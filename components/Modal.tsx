import { motion } from "framer-motion";

function Modal() {
  return (
    <div id="overlay">
      <motion.div className="modal">Modal</motion.div>
    </div>
  );
}

export default Modal;
