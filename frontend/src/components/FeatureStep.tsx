import React from 'react';

interface FeatureStepProps {
    icon: React.ReactNode;
    title: string;
    isDisabled: boolean;
    children?: React.ReactNode
}

const FeatureStep: React.FC<FeatureStepProps> = ({ icon, title, isDisabled, children }) => {
    return (
        <div data-testid="feature-step" className={`feature--step flex flex-col ${isDisabled && 'is-disabled'}`}>
            <div className='aside-title flex flex-row gap-4 items-center'>
                {icon}
                <h2 className='font-semibold'>{title}</h2>
            </div>
            <div className={`border-l-2 ml-5 pl-10 ${!children && 'h-10'}`}>
                {
                    children && <div className='rounded-lg p-4 bg-upsun-black-900'>{children}</div>
                }
            </div>
        </div>
    );
};

export default FeatureStep;
