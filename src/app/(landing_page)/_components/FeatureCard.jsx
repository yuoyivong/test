import { DocumentFilter } from "iconsax-react"
import { NotificationCircle } from "iconsax-react"
import { Profile2User } from "iconsax-react"
import { ToggleOnCircle } from "iconsax-react"

export const FeatureCard = ({ icon, title, paragraph, className }) => {
    return (
        <div className={`flex flex-col space-y-8 p-6 rounded-3xl border-[5px] border-gentleBlueUi ${className}`}>
            <div>
                {icon == "1" ?
                    <ToggleOnCircle size="32" color="#344054" variant="Bulk" /> :
                    icon == "2" ?
                        <Profile2User size="32" color="#344054" variant="Bulk" /> :
                        icon == "3" ?
                            <DocumentFilter size="32" color="#344054" variant="Bulk" /> :
                            <NotificationCircle size="32" color="#344054" variant="Bulk" />
                }
            </div>
            <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-blackUi">
                {title}
            </div>
            <div className="text-xs xl:text-sm text-lessBlackUi">
                {paragraph}
            </div>
        </div>
    )
}