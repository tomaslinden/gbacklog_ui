const Flag = ({ subjectService, frameworkService, reviewService }) => {
    const [target, setTarget] = useState({})

    useEffect(() => {
        const { targetType, id } = params
        if (targetType === 'framework') {
            frameworkService
                .getById(id)
                .then(receivedFramework => {
                    setTarget(receivedFramework);
                    // setLoaded(true)
                })
        } else if (targetType === 'subject') {
            subjectService
                .getById(id)
                .then(receivedSubject => {
                    setTarget(receivedSubject);
                    // setLoaded(true)
                })
        }
    }, []) 

    return (<>
        {isLoaded &&<>
            <h1>
                Flag {targetType}
            </h1>

            <Link to={`/${targetType}s`}>
                <button type='button' className='btn btn-primary mt-4'>Back to {`${targetType}s`}</button>
            </Link>

            {targetType === 'subject' &&
                <SubjectViewContents className='mt-4' name={target.name} description={target.description} />
            }            

            {targetType === 'framework' &&
                <FrameworkDetails
                    frameworkName={target.name}
                    frameworkDescription={target.description}
                    frameworkStatus={target.status}
                    facets={target.facets}
                />
            }
        </>}
    </>)
}

export default Flag
