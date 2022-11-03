export interface ICardProps {}

export default function Card(props: ICardProps) {
  return (
    <article className="card">
      <header className="card__header text-sm">
        <p>1.1 mi away</p>
        <p>3 hours ago</p>
      </header>
      <div className="card__img">
        <img src="" alt="Pet" />
      </div>
      <div className="card__content">
        <div className="flex flex-row space-between align-center">
          <h2 className="text-base text-secondary">Pet Name</h2>
          <i className="fa-solid fa-mars text-dark"></i>
        </div>
        <p>Senior American Shorthair</p>
        <ul className="flex flex-row wrap text-sm">
          <li className="card__attr">
            <i className="fa-solid fa-brush"></i>
            <span className="sr-only">Coat Color: </span>
            Gray
          </li>
          <li className="card__attr">
            <i className="fa-solid fa-eye"></i>
            <span className="sr-only">Eye Color: </span>
            Green
          </li>
          <li className="card__attr">
            <i className="fa-solid fa-weight-hanging"></i>
            <span className="sr-only">Weight: </span>
            11 lbs
          </li>
          <li className="card__attr">
            <i className="fa-solid fa-microchip"></i>
            <span className="sr-only">Microchip ID: </span>
            123456789012345
          </li>
        </ul>
      </div>
    </article>
  );
}
