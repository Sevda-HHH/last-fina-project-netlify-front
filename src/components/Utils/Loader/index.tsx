import { useLoading, Circles } from '@agney/react-loading';
export const Content = () => {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Circles />,
    });

    return (
        < section className="text-center text-purple" style={{ width: "10%" }} {...containerProps}>
            {indicatorEl}
        </section >
    );
}