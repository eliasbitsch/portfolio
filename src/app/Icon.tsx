import { FC } from 'react';

interface IconProps {
    size?: string;
    color?: string;
}

const EmailIcon: FC<IconProps> = ({ size = '24px', color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill={color}
        transform="rotate(180)"
    >
        <path d="M512 468.667l342 214h-684zM854 170.667v426l-342-212-342 212v-426h684zM854 768.667q34 0 59-26t25-60v-512q0-34-25-60t-59-26h-684q-34 0-59 26t-25 60v512q0 34 25 60t59 26h684z"></path>
    </svg >
);

export default EmailIcon;
