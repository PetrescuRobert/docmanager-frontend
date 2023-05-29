import Layout from '../../components/Layout';
import Task from '../../components/Task';

export default function Home() {
  return (
    <Layout>
      <div>
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </Layout>
  );
}
