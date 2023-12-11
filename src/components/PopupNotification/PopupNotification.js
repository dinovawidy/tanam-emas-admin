import React from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../ButtonGreen/ButtonGreen";

const PopupNotification = ({ title, subtitle, onCancel }) => {
    const t = useTranslation();
    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => {
                        onCancel();
                    }}
                />
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
                        <div className="m-3">
                            <div className="flex flex-row items-center gap-x-4">
                                <div className="w-20">
                                    <img
                                        className="h-full w-full"
                                        src={
                                            process.env.REACT_APP_ASSETS_IMAGE + "caution-icon.svg"
                                        }
                                        alt="caution"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-green-primary font-bold">{title}</h4>
                                    <div className="text-sm">{subtitle}</div>
                                </div>
                            </div>
                            <div className="items-center gap-2 mt-3 flex justify-end">
                                <ButtonGreen
                                    title={t("general.ok")}
                                    onClick={() => {
                                        onCancel();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupNotification;
