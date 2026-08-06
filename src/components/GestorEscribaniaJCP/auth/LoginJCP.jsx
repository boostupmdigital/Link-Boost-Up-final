import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const LoginJCP = () => {

    const {
        login,
        isAuthenticated,
        isLoading
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    const destination =
        location.state?.from?.pathname ||
        "/gestor-escribania-jcp/dashboard";

    async function handleSuccess(response) {

        try {

            setLoadingLogin(true);
            setError("");

            await login(response.credential);

            navigate(destination, { replace: true });

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "No fue posible iniciar sesión."
            );

        } finally {

            setLoadingLogin(false);

        }

    }

    function handleError() {

        setError(
            "No fue posible autenticarse con Google."
        );

    }

    if (isLoading) {

        return (

            <div className="flex items-center justify-center min-h-screen">

                <p className="text-slate-100">
                    Comprobando sesión...
                </p>

            </div>

        );

    }

    if (isAuthenticated) {

        return <Navigate to={destination} replace />;

    }

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

                {/* PANEL IZQUIERDO */}

                <div className="bg-[#001656] text-white flex flex-col justify-center items-center p-12">

                    {/* Aquí luego pondremos el logo */}

                    <div className="w-32 h-32 rounded-full border border-yellow-500 flex items-center justify-center text-5xl font-serif">

                        JP

                    </div>

                    <h2 className="mt-10 tracking-[8px] text-yellow-500 text-sm">

                        ESCRIBANÍA

                    </h2>

                </div>

                {/* PANEL DERECHO */}

                <div className="p-12 flex flex-col justify-center">

                    <p className="uppercase tracking-[3px] text-sm text-orange-500 font-semibold">

                        Sistema interno

                    </p>

                    <h1 className="text-4xl font-bold text-slate-800 mt-2">

                        Sistema Integral de Gestión

                    </h1>

                    <p className="text-slate-500 mt-6 leading-7">

                        Accedé utilizando tu cuenta de Google autorizada.

                    </p>

                    <div className="mt-10">

                        <GoogleLogin

                            onSuccess={handleSuccess}

                            onError={handleError}

                            useOneTap={false}

                            theme="outline"

                            size="large"

                            shape="rectangular"

                            text="signin_with"

                            locale="es"

                        />

                    </div>

                    {

                        loadingLogin &&

                        <p className="text-sm text-slate-500 mt-5">

                            Verificando credenciales...

                        </p>

                    }

                    {

                        error &&

                        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 text-sm">

                            {error}

                        </div>

                    }

                    <p className="text-xs text-slate-400 mt-10">

                        Acceso exclusivo para colaboradores autorizados.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default LoginJCP;