import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from '../../app';
import { setSipAction } from '../../app/reducer/Action';
import { useNavigate } from 'react-router-dom';
const schema = yup.object({
  sipAddress: yup
    .string()
    .required()
    .matches(/^([\w.-]+)@([\w.-]+):(\d+)$/, 'SIP address is not valid'),
  password: yup.string().required(),
  websocket: yup
    .string()
    .required()
    .matches(/^[\w.-]+:\d+$/, 'Websocket is not valid'),
  proxy: yup
    .string()
    .required()
    .matches(/^[\w.-]+$/, 'Proxy is not valid'),
});

export default function RegisterSIP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [state, dispatch] = useAppContext();
  const { sip, sipStatus } = state;
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(setSipAction(data));
    localStorage.setItem('sip', JSON.stringify(data));
    navigate('/');
  };
  useEffect(() => {
    console.log(sip, sipStatus);
    if (sip && sipStatus.registered) {
      navigate('/');
    }
  }, [sip, sipStatus]);
  return (
    <div className="h-[80%]">
      <p className="text-center p-2 text-3xl font-bold italic">RegisterSIP</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center h-full"
      >
        <div className="flex flex-col gap-1 p-1">
          <label htmlFor="sipAddress">
            SIP address (extension@domain:port){' '}
            <span className="text-red-400">*</span>{' '}
          </label>
          <input
            className={`bg-transparent outline-none border-0 border-white p-1 text-white border-b ${
              errors.sipAddress && 'border-red-400'
            }`}
            id="sipAddress"
            {...register('sipAddress')}
          />
        </div>
        <div className="flex flex-col gap-1 p-1">
          <label htmlFor="password">
            Password <span className="text-red-400">*</span>{' '}
          </label>
          <input
            className={`bg-transparent outline-none border-0 border-white p-1 text-white border-b ${
              errors.password && 'border-red-400'
            }`}
            id="password"
            {...register('password')}
          />
        </div>
        <div className="flex flex-col gap-1 p-1">
          <label htmlFor="websocket">
            Websocket <span className="text-red-400">*</span>{' '}
          </label>
          <div className="flex border-0 border-white border-b">
            <p>wss://</p>
            <input
              className={`bg-transparent outline-none text-white  ${
                errors.websocket && 'border-red-400'
              }`}
              id="websocket"
              {...register('websocket')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-1">
          <label htmlFor="proxy">
            Proxy <span className="text-red-400">*</span>{' '}
          </label>
          <input
            className={`bg-transparent outline-none border-0 border-white p-1 text-white border-b ${
              errors.proxy && 'border-red-400'
            }`}
            id="proxy"
            {...register('proxy')}
          />
        </div>
        <button
          type="submit"
          className="self-center  p-2 font-bold my-4 bg-[#522F8F] hover:bg-[#7E47DF] focus:bg-[#7E47DF] shadow-lg rounded-lg hover:outline outline-2 hover:outline-[#522F8F]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
