import type { JSX } from "react";
import type { Sede } from "../interfaces/sedeInterface";

type Props = {
  sede: Sede;
  showMap?: boolean;
  showContactInfo?: boolean;
};

export default function SedeCard({
  sede,
  showMap = false,
  showContactInfo = true,
}: Props): JSX.Element {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3">
        <img
          src={sede.flagSrc}
          alt={sede.country}
          className="w-7 h-5 object-cover rounded-sm border"
        />
        <h3 className="text-xl font-semibold text-gray-900">
          {sede.city}, {sede.country}
        </h3>
      </div>

      {sede.description && (
        <p className="mt-3 text-gray-600">{sede.description}</p>
      )}

      {showContactInfo && (
        <div className="mt-4 text-gray-700 space-y-2">
          <div>
            <span className="font-semibold text-gray-900">Dirección:</span>{" "}
            {sede.addressLine1}
            {sede.addressLine2 && (
              <>
                <br />
                {sede.addressLine2}
              </>
            )}
          </div>

          {sede.email && (
            <div>
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {sede.email}
            </div>
          )}

          {sede.phone && (
            <div>
              <span className="font-semibold text-gray-900">Teléfono:</span>{" "}
              {sede.phone}
            </div>
          )}

          {sede.mapUrl && (
            <a
              href={sede.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-black font-medium hover:underline"
            >
              Ver en Google Maps →
            </a>
          )}
        </div>
      )}

      {showMap && sede.mapEmbedSrc && (
        <div className="mt-6 w-full h-[300px] rounded-xl overflow-hidden">
          <iframe
            src={sede.mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${sede.city} Map`}
          />
        </div>
      )}
    </div>
  );
}