const QuestionState = ({date, author, stack, className}) => {
    return (
        <div className={`flex font-medium items-start flex-col xl:flex-row space-x-0 space-y-1 xl:space-x-6 text-xs xl:text-sm text-blackUi ${className}`}>
            <p className="mt-1">Asked {date}</p>
            <p>By {author}</p>
            <p>Stack {stack}</p>
        </div>
    )
}

export default QuestionState