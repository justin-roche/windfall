import React, { useEffect } from 'react';

// import { isEmail } from 'validator';
import Layout from 'components/Layout';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import * as action from './action';

// import * as action from '../login/action';

let Login = ({ scrape: { results }, getScrapeAction }) => {
  const onSubmit = async (value) => {
    // loginAction(value);
  };
  useEffect(() => {
    if (!results || results.length === 0) {
      getScrapeAction();
    }
  }, []);
  return (
    <Layout title='scrape' returnPath='/' showSidebar={false}>
      scrape here
    </Layout>
  );
};

Login = reduxForm({
  form: 'Login',
})(Login);

const mapStateToProps = ({ global, scrape }) => ({
  global,
  scrape,
});

const mapDispatchToProps = {
  //   loginAction: action.loginAction,
  getScrapeAction: action.getScrapeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// import './styles.scss';

// import React from 'react';

// import Layout from 'components/Layout';
// import { connect } from 'react-redux';

// const ScrapeResults = ({
//   route: { title },
//   //   scrape: {
//   //     results,
//   //     metaData: { index: page, total },
//   //   },
//   //   getScrapeAction,
// }) => {
//   //   useEffect(() => {
//   //     // if (!results || results.length === 0) {
//   //     //   getScrapeAction();
//   //     // }
//   //   }, []);

//   const onPageChange = ({ selected: skip }) => {
//     // getScrapeAction(skip);
//   };

//   return (
//     <Layout title={title}>
//       {/* {results.map((result) => (
//         <div key={post._id} className='post__item'>
//           <div>
//             {`${formatDate(post.publishAt)} - Published by `}
//             <code>
//               <b>{post.user?.name}</b>
//             </code>
//           </div>

//           <Link to={`/p/${post._id}`} className='post__title'>
//             <h3>{post.title}</h3>
//           </Link>

//           <p className='post__description'>{post.description}</p>

//           <div className='tag__group'>
//             {post.tags.map((tag, i) => (
//               <Link to={`/tags/${tag}`} key={i} className='tag__item'>
//                 {tag}
//               </Link>
//             ))}
//           </div>
//         </div>
//       ))} */}

//       {/* <Paginate
//         pageCount={total}
//         marginPagesDisplayed={3}
//         pageRangeDisplayed={5}
//         initialPage={page}
//         previousLabel={<i className='fa fa-angle-left'></i>}
//         nextLabel={<i className='fa fa-angle-right'></i>}
//         onPageChange={onPageChange}
//         disableInitialCallback
//         containerClassName={'pagination row'}
//         subContainerClassName={'pages pagination'}
//         activeClassName={'active'}
//       /> */}
//     </Layout>
//   );
// };

// const mapStateToProps = ({ global }) => ({
//   global,
// });
// // const mapStateToProps = ({ scrapeReducer: { results } }) => ({ results });

// const mapDispatchToProps = {
//   //   getScrapeAction: action.getScrapeAction,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ScrapeResults);
