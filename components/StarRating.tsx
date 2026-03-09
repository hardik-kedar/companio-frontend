// "use client";

// interface Props {
//   rating: number;
//   setRating: (value: number) => void;
// }

// export default function StarRating({
//   rating,
//   setRating
// }: Props) {

//   return (

//     <div className="flex gap-2 text-2xl">

//       {[1,2,3,4,5].map((star) => (

//         <button
//           key={star}
//           type="button"
//           onClick={() => setRating(star)}
//           className={
//             star <= rating
//               ? "text-yellow-500"
//               : "text-gray-300"
//           }
//         >

//           ★

//         </button>

//       ))}

//     </div>

//   );

// }
"use client";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({
  value,
  onChange
}: Props) {

  return (

    <div className="flex gap-2 text-2xl">

      {[1,2,3,4,5].map((star) => (

        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={
            star <= value
              ? "text-yellow-500"
              : "text-gray-300"
          }
        >
          ★
        </button>

      ))}

    </div>

  );

}