import Image from "next/image"
import chhun from "../../../../public/images/profile/chhun.JPG"
import chy from "../../../../public/images/profile/chy.jpeg"
import dy from "../../../../public/images/profile/dy.jpg"
import ha from "../../../../public/images/profile/ha.jpg"
import la from "../../../../public/images/profile/la.jpg"
import lay from "../../../../public/images/profile/lay.jpg"
import nin from "../../../../public/images/profile/nin.png"
import seang from "../../../../public/images/profile/seang.jpg"
import seth from "../../../../public/images/profile/seth.jpg"
import thy from "../../../../public/images/profile/thy.JPG"
import rith from "../../../../public/images/profile/rith.JPG"
import pheak from "../../../../public/images/profile/pheak.png"

export const TeamProfile = ({ name }) => {
    return (
        <div className="flex flex-col text-center gap-6 w-full mb-12">
            <div className="mx-auto">
                <Image src={name == "Kheang Ngichseang" ? seang : name == "Meng Soklay" ? lay : name == "Sarin Sokmanin" ? nin : name == "Phy Lichy" ? chy : name == "Yin Vannthy" ? thy : name == "Chan Seyha" ? ha : name == "Soy Tola" ? la : name == "Sim Viseth" ? seth : name == "Kroem Vandy" ? dy : name == "Sry Kimchhun" ? chhun : name == "Phan Sothyrith" ? rith : name == "Thy Sopheak" ? pheak : chhun} width={148} height={148} className="rounded-full object-cover h-[148px]" />
            </div>
            <p className="whitespace-nowrap text-blackUi text-xs lg:text-sm font-medium">{name}</p>
        </div>
    )
}