'use server';
import { fetchUniversities } from "./actions/university";
import Container from "./components/base/Container";
import Landing from "./components/Landing";

export default async function Page() {
    const universities = await fetchUniversities();
    return (
        <Container>
            <Landing universities={universities} />
        </Container>
    );
}
