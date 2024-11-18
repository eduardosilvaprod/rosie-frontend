import { Alert, AlertProps } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedAlertProps extends AlertProps {
  show: boolean;
}

export const AnimatedAlert: React.FC<AnimatedAlertProps> = ({ show, children, ...props }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert {...props}>{children}</Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};