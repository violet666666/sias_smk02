import { Sidebar } from "flowbite-react";
export const DefaultLayout = ({ sidebar, content }) => {
    return (
        <div className="flex">
            <div>
                {sidebar}
            </div>
            <div className="content">
                {content}
            </div>
        </div>
    )
}