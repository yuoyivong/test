import React from 'react';
import Image from "next/image";
import CheckBox from "@/app/(application)/trash/_component/CheckBox";
import RecycleIcon from "@/app/(application)/trash/_component/RecycleIcon";
import TrashIcon from "@/app/(application)/trash/_component/TrashIcon";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const RecycleBin = ({ data, checkedRows, isHeaderChecked, onHeaderCheck, onRowCheck, onIconClick, isAlreadyDeleted }) => {
    return (
        <div className="relative flex flex-col w-full max-h-[250px] min-h-[250px] sm:min-h-[450px] sm:max-h-[450px] overflow-y-scroll no-scrollbar">
            <div className="overflow-x-auto no-scrollbar">
                {data.length === 0 ? (
                    <div className="text-center py-10 w-full h-full text-blackUi">
                        <div className="flex justify-center items-center flex-col">
                            <Image src={'/images/no-data.png'} alt={'No Data Available'} width={300} height={300} />
                            <p className={'text-2xl font-semibold text-blackUi'}>No data available</p>
                        </div>
                    </div>
                ) : (
                    <table className="text-left table-auto min-w-full text-blackUi">
                        <thead className="bg-primaryCherUi font-semibold text-xs sm:text-sm xl:text-base sticky top-0 text-blackUi">
                        <tr>
                            <td className="px-4 pl-8 pr-4 w-10 rounded-tl-radiusBorder rounded-bl-radiusBorder">
                                <CheckBox
                                    checked={isHeaderChecked && !isAlreadyDeleted}
                                    onClick={onHeaderCheck}
                                />
                            </td>
                            <td className="p-4 max:w-1/4 min:w-1/4">Title</td>
                            <td className="p-4 max:w-2/5 min:w-2/5">Description</td>
                            <td className="p-4 max:w-1/6 min:w-1/6">Status</td>
                            <td className="p-4 max:w-1/6 min:w-1/6">Created At</td>
                            <td className="p-4 max:w-1/6 min:w-1/6">Updated At</td>
                            <td className="p-4 max:w-1/6 min:w-1/6 rounded-tr-radiusBorder rounded-br-radiusBorder">Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr key={item.id}
                                className="border-b border-lessWhiteUi text-blackUi text-xs sm:text-sm xl:text-base font-medium hover:bg-opacity-25 hover:bg-lessBlackUi/5">
                                <td className="py-4 pl-8 pr-4 rounded-tl-radiusBorder rounded-bl-radiusBorder">
                                    <CheckBox
                                        checked={checkedRows.includes(item.id)}
                                        onClick={() => onRowCheck(item.id)}
                                    />
                                </td>
                                <td className="p-4 max-w-[10rem] min-w-[10rem] capitalize truncate">{item.title}</td>
                                <td className="p-4 first-letter:uppercase max-w-[15rem] min-w-[15rem] truncate">{item.description}</td>
                                <td className="p-4 capitalize">
                                    <div
                                        className={`flex items-center justify-center gap-2 p-1 bg-opacity-20 border w-24 rounded-full text-xs lg:text-sm font-medium ${(item?.status === 'private' ? 'text-privateColor bg-privateColor border-privateColor' : 'text-publicColor bg-publicColor border-publicColor')}`}>
                                        {item?.status === 'private' ? (
                                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="3" cy="2.83028" rx="3" ry="2.83028" fill="#105DFF"/>
                                            </svg>
                                        ) : (
                                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="3" cy="2.83028" rx="3" ry="2.83028" fill="#36CC66"/>
                                            </svg>
                                        )}
                                        {item.status}
                                    </div>
                                </td>
                                <td className="p-4">{formatDate(item.createdAt)}</td>
                                <td className="p-4">{formatDate(item.updatedAt)}</td>
                                <td className="p-4 rounded-tr-radiusBorder rounded-br-radiusBorder">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <RecycleIcon onClick={() => onIconClick(item, 'recycle')} />
                                        <TrashIcon onClick={() => onIconClick(item, 'delete')} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RecycleBin;

