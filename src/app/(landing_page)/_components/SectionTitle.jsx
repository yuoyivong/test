export const SectionTitle = ({title, paragraph}) => {
    return (
        <div className="max-w-[700px] space-y-8 flex flex-col items-center mx-auto justify-center">
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl text-blackUi font-semibold text-center !leading-[1.15]">{title}</h2>
            <p className="text-xs lg:text-base text-lessBlackUi text-center">{paragraph}</p>
        </div>
    )
}