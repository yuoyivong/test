import React from 'react';
import Image from "next/image";

const Workspace = () => {
    return (
        <div className={'absolute top-1/3 left-1/2'}>
            <div className={'flex flex-col items-center justify-center'}>
                <Image
                    src={'/images/no-data.png'}
                    alt={'No Data Available'}
                    width={300}
                    height={300}
                />
                <p className={'text-2xl font-semibold text-blackUi'}>No data available Page</p>
            </div>
        </div>
    );
};

export default Workspace;
