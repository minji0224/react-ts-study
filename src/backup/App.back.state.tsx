import Counter from "./components/Counter";
import CreatePost from "./components/todo/Post";
import Layout from "./components/Layout";
import Todo from "./components/todo/Todo";
import WelcomeMessage from "./components/WelcomeMessage";
import Post from "./components/todo/Post";

const App = () => {
  return <>
    <Counter />
    <hr />
    <Todo />
    <hr />
    <Layout title="Home Page">
      {/* children속성을 안쪽 태그에 */}
      <WelcomeMessage name="민지" />
      <p>Welcome to our website!</p>
    </Layout>
    <hr />
    <Post />
  </>;
};

export default App;