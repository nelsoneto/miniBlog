import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

//context
import { useAuthValue } from '../../contexts/AuthContext';

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {

  const { user } = useAuthValue()
  const uid = user.uid

  //post do usuario - 
  const {documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  if(loading){
    return <p>Carregando</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts.</p>
            <Link to="/" className="btn">Criar seu primeiro post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}>
              <span>Titulo</span>
              <span>Ações</span>
            </div>
            {posts && posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn btn-edit">
                    Editar
                  </Link>
                  <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </>
        ) }
    </div>
  )
}

export default Dashboard