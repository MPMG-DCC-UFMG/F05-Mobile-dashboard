import React from "react";

interface TagListProps {
    tags: string[]
}

export const TagList: React.FC<TagListProps> = (props) => {

    const {tags} = props

    return (
        <div>
            <div className="tags">
                {tags.map((tag, index) => {
                    return <span className="tag is-medium is-rounded is-info" key={index}>{tag}</span>
                })}
            </div>
        </div>
    )
}