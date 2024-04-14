import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../../Redux/Feature/ManageUserSlice/RegisterStape";
import { creatUser } from "../../../Redux/Feature/ManageUserSlice/UserSlice";

const Welcome = () => {
    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { step } = useSelector((state: RootState) => state.registerStape);
    const userInfo = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (step === 0) {
            navig('/register');
        }
        // else if (step === 3) {
            
        // }
    }, [navig, step])

    const nextPage = () => {
        dispatch(creatUser({ name: userInfo.name, email: userInfo.email, password: userInfo.password, dailyStudyTime: userInfo.dailyStudyTime, education: userInfo.education }))
    };

    if (userInfo.isError) {
        dispatch(updateStep(0))
    }
    else if(userInfo.isSuccess){
        navig('/')
    }



    return (
        <div>
            <div className="p-10 pb-5">
                <div className="flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 lg:pb-0">
                    <div className="md:w-1/2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Perfect, nice to meet you! 😎
                            Welcome to Study Together!</h2>
                        <div className="h-20 md:h-24 lg:h-32 flex flex-col items-center justify-center ">
                            <Spin spinning={userInfo.isLoading} size="large" />
                            <p className={`text-sm text-gray-600 ${userInfo.isLoading ? '' : 'hidden'}`}>Wait few seconds...</p>

                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1711789965/test/y7ihzellpcqpbq5tdlu4.jpg" alt="study-img" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>

                    </div>
                    <div>

                        <button disabled={userInfo.isLoading} onClick={nextPage} className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${userInfo.isLoading ? 'opacity-50 border-blue-100 cursor-not-allowed' : ''}`} data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;