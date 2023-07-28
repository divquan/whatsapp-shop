
import Women from "@/components/women";
import { useRouter } from "next/router";
import Men from "@/components/men";

export default function SpecifiedCollection() {

    const router = useRouter();
    let { name } = router.query;

    return (
        <div>
            {name === 'women' ? <Women /> : <Men />}
        </div>
    )
}