import Counter from "./components/Counter";
import Layout from "./components/Layout";
import Todo from "./components/Todo";
import WelcomeMessage from "./components/WelcomeMessage";

const App = () => {
  return <>
    <Counter />
    <hr />
    <Todo />
    <hr />
    <Layout title="Home Page">
      <WelcomeMessage name="민지" />
      <p>Welcome to our website!</p>
    </Layout>
  </>;
};

export default App;