import { Route, Navigate, Routes } from "react-router-dom"
import NotFoundContainer from "../container/NotFoundContainer";
import { AuthRoutes } from "../routes";

const Auth = () => {
    const getRoutes = () => {
		return AuthRoutes.map((data, key) => {
            return (
                <Route path={data.path} element={data.component} key={key} />
            );
		});
	}

    return (
        <div className='h-screen bg-soft flex justify-center items-center'>
            <Routes>
                {getRoutes()}
                <Route path='*' element={<NotFoundContainer />} /> 
                <Route path='/' element={<Navigate replace to='/auth/sign-in' />} />
                <Route path='/auth/sign-up' element={<Navigate replace to='/auth/sign-up' />} />
            </Routes>
        </div>
    )
}

export default Auth