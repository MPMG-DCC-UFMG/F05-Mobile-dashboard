import React from "react";

interface StatsItemProps {
    title: string,
    value: string,
}

export const StatsItem: React.FC<StatsItemProps> = (props) => {
    const {title, value} = props
    return (
        <div className="level-item has-text-centered">
            <div>
                <p className="heading">{title}</p>
                <p className="title">{value}</p>
            </div>
        </div>
    )
}