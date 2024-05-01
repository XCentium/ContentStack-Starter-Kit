import css from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={css.Wrapper}>
      <div className={css.Body}>
        <p className={css.ErrorCode}>404</p>
        <h1 className={css.ErrorMessage}>Page not found</h1>
        <p className={css.ErrorDescription}>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <div className={css.Links}>
          <a href="/" className={css.PrimaryLink}>
            Go back home
          </a>
        </div>
      </div>
    </div>
  )
}
