import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
            <motion.h1
                className="text-7xl font-bold text-red-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>

            <motion.p
                className="mt-2 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Oops! The page you are looking for doesn't exist.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-6"
            >
                <Button
                    variant="outline"
                    onClick={() => navigate('/job-tracker')}
                >
                    Back to DashBoard
                </Button>
            </motion.div>
        </div>
    );
};
export default NotFoundPage;
